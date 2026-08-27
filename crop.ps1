Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\images\yanadi.jpg"
$destPath = "C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\images\yanadi.jpg"

$srcImg = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $srcImg.Width
$h = $srcImg.Height

Write-Host "Original Yanadi image dimensions: $w x $h"

# We want a square crop focusing on Yanadi's face and upper chest.
# The face is located in the upper half of the image.
# Square size = $w (since width is smaller than height in vertical portrait)
$cropSize = [Math]::Min($w, $h)

# Start y near the top (e.g. y = 15% of height, or y = 0 to 25% height)
$cropX = 0
$cropY = [int]($h * 0.12) # focus on face area

if ($cropY + $cropSize -gt $h) {
    $cropY = $h - $cropSize
}

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropSize, $cropSize)
$targetImg = New-Object System.Drawing.Bitmap($cropSize, $cropSize)
$g = [System.Drawing.Graphics]::FromImage($targetImg)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$g.DrawImage($srcImg, (New-Object System.Drawing.Rectangle(0, 0, $cropSize, $cropSize)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)

$srcImg.Dispose()
$g.Dispose()

# Save cropped square image
$targetImg.Save("C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\images\yanadi_cropped.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$targetImg.Dispose()

Remove-Item $srcPath
Move-Item "C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\images\yanadi_cropped.jpg" $srcPath

Write-Host "Yanadi photo face cropped successfully!"
