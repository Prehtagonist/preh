import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")