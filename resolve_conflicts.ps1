$files = @("styles.css", "vercel.json")

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Resolving conflicts in $file"
        $content = Get-Content -Path $file -Raw -Encoding UTF8
        
        # Regex to match conflict blocks and keep HEAD
        # (?s) enables single-line mode (dot matches newline)
        $resolved = [Regex]::Replace($content, "(?s)<<<<<<< HEAD(.*?)=======.*?>>>>>>> .*?(\r?\n)?", '$1')
        
        if ($content -ne $resolved) {
            Set-Content -Path $file -Value $resolved -Encoding UTF8 -NoNewline
            Write-Host "Resolved $file"
        } else {
            Write-Host "No conflicts found in $file"
        }
    }
}
