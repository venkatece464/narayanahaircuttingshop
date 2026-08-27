Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\images\logo.jpg"
$destPath = "C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\images\logo_optimized.jpg"

$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)

# 300x300 high resolution retina size
$newW = 300
$newH = 300

$targetImg = New-Object System.Drawing.Bitmap($newW, $newH)
$g = [System.Drawing.Graphics]::FromImage($targetImg)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$g.DrawImage($srcImg, 0, 0, $newW, $newH)

$srcImg.Dispose()
$g.Dispose()

$targetImg.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$targetImg.Dispose()

Remove-Item $srcPath
Move-Item $destPath $srcPath

Write-Host "Logo optimized to 300x300!"
