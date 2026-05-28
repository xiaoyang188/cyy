import UIKit

public class Tools {
	static func isDarkMode() -> Bool {
	    if #available(iOS 13.0, *) {
	        return UITraitCollection.current.userInterfaceStyle == .dark
	    } else if #available(iOS 12.0, *) {
	        return UIScreen.main.traitCollection.userInterfaceStyle == .dark
	    } else {
	        return false
	    }
	}
    
    private class ThemeMonitorView: UIView {
        override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
            super.traitCollectionDidChange(previousTraitCollection)
            Tools.handleThemeChange()
        }
    }
    
    private static var monitorView: ThemeMonitorView?
    private static var lastTheme: String = Tools.isDarkMode() ? "dark" : "light"
    private static var themeCallbacks: [String: (String) -> Void] = [:]
    
    private static func keyWindow() -> UIWindow? {
        if #available(iOS 13.0, *) {
            let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
            let window = scenes.flatMap { $0.windows }.first { $0.isKeyWindow }
            return window ?? UIApplication.shared.windows.first
        } else {
            return UIApplication.shared.keyWindow ?? UIApplication.shared.windows.first
        }
    }
    
    private static func attachMonitor() {
        DispatchQueue.main.async {
            if monitorView == nil {
                let v = ThemeMonitorView(frame: .zero)
                v.isHidden = true
                v.alpha = 0
                monitorView = v
                keyWindow()?.addSubview(v)
            }
        }
    }
    
    private static func detachMonitorIfNeeded() {
        DispatchQueue.main.async {
            if themeCallbacks.isEmpty {
                monitorView?.removeFromSuperview()
                monitorView = nil
            }
        }
    }
    
    private static func handleThemeChange() {
        let current = Tools.isDarkMode() ? "dark" : "light"
        if current != lastTheme {
            lastTheme = current
            for cb in themeCallbacks.values {
                cb(current)
            }
        }
    }
    
    @discardableResult
    static func onOsThemeChange(_ callback: @escaping (String) -> Void) -> String {
        attachMonitor()
        let id = UUID().uuidString
        themeCallbacks[id] = callback
        return id
    }
    
    static func offOsThemeChange(_ id: String? = nil) {
        if let id = id {
            themeCallbacks.removeValue(forKey: id)
        } else {
            themeCallbacks.removeAll()
        }
        detachMonitorIfNeeded()
    }
    
    static func getOsTheme() -> String {
        return Tools.isDarkMode() ? "dark" : "light"
    }
    
    static func saveToFilesDir(tempFilePath: String, fileName: String, success: @escaping (String) -> Void, fail: @escaping (String, Int) -> Void) {
        DispatchQueue.global().async {
            let fileManager = FileManager.default
            
            if !fileManager.fileExists(atPath: tempFilePath) {
                fail("Source file does not exist", 13900016)
                return
            }
            
            // 获取 _doc 目录的绝对路径
            // 在 UniApp 中，_doc 通常对应 Documents/Pandora/apps/[AppID]/doc
            // 这里我们尝试构建 _doc/uniapp_save 目录
            
            // 为了简单起见，我们直接操作 Documents 目录，但按照用户要求，我们需要保存到类似 _doc/uniapp_save 的位置
            // 由于我们无法直接得知 _doc 的确切物理路径（除非传入），我们可以使用 tempFilePath 的父目录作为参考，
            // 或者直接使用 Documents 目录下的 uniapp_save。
            // 观察用户提供的路径：.../Documents/Pandora/apps/__UNI__D34B03B/doc/...
            // 我们可以尝试在 Documents 目录下创建 uniapp_save，但这可能不是用户想要的 "_doc/uniapp_save"
            // 用户说 "返回给我的时候也只需要返回_doc/uniapp_save开头"
            
            // 更稳妥的方式是：通过 UTSiOS.convert2AbsFullPath("_doc/") 获取 _doc 的根目录
            // 但在 Swift 中无法直接调用 UTSiOS。
            // 我们可以利用 tempFilePath，回溯找到 /doc/ 目录。
            
            var docPath = ""
            if let docRange = tempFilePath.range(of: "/doc/") {
                docPath = String(tempFilePath[..<docRange.upperBound])
            } else {
                 // Fallback to Documents if not found (though user path shows it exists)
                 guard let documentsURL = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
                    fail("Failed to get document directory", -1)
                    return
                }
                docPath = documentsURL.path + "/"
            }
            
            // 目标目录: _doc/uniapp_save
            let saveDir = docPath + "uniapp_save"
            let destinationPath = saveDir + "/" + fileName
            
            do {
                // 确保目录存在
                if !fileManager.fileExists(atPath: saveDir) {
                    try fileManager.createDirectory(atPath: saveDir, withIntermediateDirectories: true, attributes: nil)
                }
                
                if fileManager.fileExists(atPath: destinationPath) {
                    try? fileManager.removeItem(atPath: destinationPath)
                }
                
                do {
                    try fileManager.moveItem(atPath: tempFilePath, toPath: destinationPath)
                    // 返回相对路径 _doc/uniapp_save/...
                    let relativePath = "_doc/uniapp_save/" + fileName
                    success(relativePath)
                } catch {
                    // Try copy if move fails
                    try fileManager.copyItem(atPath: tempFilePath, toPath: destinationPath)
                    try? fileManager.removeItem(atPath: tempFilePath)
                     let relativePath = "_doc/uniapp_save/" + fileName
                    success(relativePath)
                }
            } catch {
                fail("Save failed: \(error.localizedDescription)", 13900016)
            }
        }
    }
    
    private static func latestUniappTempDir(docRoot: String) -> String? {
        let fm = FileManager.default
        guard let entries = try? fm.contentsOfDirectory(atPath: docRoot) else { return nil }
        var maxVal: Int = -1
        var maxPath: String? = nil
        for name in entries {
            if name.hasPrefix("uniapp_temp_") {
                let suffix = name.replacingOccurrences(of: "uniapp_temp_", with: "")
                if let val = Int(suffix), val > maxVal {
                    maxVal = val
                    maxPath = (docRoot as NSString).appendingPathComponent(name)
                }
            }
        }
        return maxPath
    }
    
    public static func mergeWithCanvas(width: Int, height: Int, images: [[String: Any]], docRoot: String, success: @escaping (String) -> Void, fail: @escaping (String) -> Void) {
        UIGraphicsBeginImageContextWithOptions(CGSize(width: width, height: height), false, 1.0)
        guard let ctx = UIGraphicsGetCurrentContext() else {
            fail("Context not available")
            return
        }
        for (index, item) in images.enumerated() {
            guard var url = item["url"] as? String,
                  let x = item["x"] as? Double,
                  let y = item["y"] as? Double,
                  let w = item["width"] as? Double,
                  let h = item["height"] as? Double else { continue }
            if url.hasPrefix("file://") {
                url = String(url.dropFirst(7))
            }
            let rect = CGRect(x: CGFloat(x), y: CGFloat(y), width: CGFloat(w), height: CGFloat(h))
            guard let img = UIImage(contentsOfFile: url) else { continue }
            if index == 0 {
                img.draw(in: rect)
            } else {
                ctx.saveGState()
                let path = UIBezierPath(ovalIn: rect)
                path.addClip()
                img.draw(in: rect)
                ctx.restoreGState()
            }
        }
        guard let result = UIGraphicsGetImageFromCurrentImageContext() else {
            UIGraphicsEndImageContext()
            fail("Render failed")
            return
        }
        UIGraphicsEndImageContext()
        let fm = FileManager.default
        var base = latestUniappTempDir(docRoot: docRoot)
        if base == nil {
            base = (docRoot as NSString).appendingPathComponent("uniapp_temp_\(Int(Date().timeIntervalSince1970 * 1000))")
            try? fm.createDirectory(atPath: base!, withIntermediateDirectories: true, attributes: nil)
        }
        let canvasDir = (base! as NSString).appendingPathComponent("canvas")
        if !fm.fileExists(atPath: canvasDir) {
            try? fm.createDirectory(atPath: canvasDir, withIntermediateDirectories: true, attributes: nil)
        }
        let fileName = "\(Int(Date().timeIntervalSince1970 * 1000)).png"
        let outPath = (canvasDir as NSString).appendingPathComponent(fileName)
        if let data = result.pngData() {
            do {
                try data.write(to: URL(fileURLWithPath: outPath))
                success(outPath)
            } catch {
                fail("Write failed")
            }
        } else {
            fail("PNG encode failed")
        }
    }
}
