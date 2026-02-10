param(
    [Parameter(Mandatory=$true)]
    [string]$Prompt,
    
    [Parameter(Mandatory=$true)]
    [string]$OutputPath,
    
    [string]$Size = "1792x1024"  # landscape for cinematic, 1024x1792 for portrait
)

$apiKey = $env:OPENAI_API_KEY
if (-not $apiKey) {
    Write-Error "OPENAI_API_KEY not set"
    exit 1
}

$body = @{
    model = "dall-e-3"
    prompt = $Prompt
    n = 1
    size = $Size
    quality = "hd"
    style = "vivid"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

Write-Host "Generating image with DALL-E 3..."
Write-Host "Prompt: $($Prompt.Substring(0, [Math]::Min(100, $Prompt.Length)))..."

try {
    $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/images/generations" -Method Post -Headers $headers -Body $body
    $imageUrl = $response.data[0].url
    $revisedPrompt = $response.data[0].revised_prompt
    
    Write-Host "Downloading image..."
    Invoke-WebRequest -Uri $imageUrl -OutFile $OutputPath
    
    Write-Host "Saved to: $OutputPath"
    Write-Host "Revised prompt: $revisedPrompt"
    
    return @{
        success = $true
        path = $OutputPath
        revisedPrompt = $revisedPrompt
    }
} catch {
    Write-Error "Failed: $_"
    exit 1
}
