Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\xampp\htdocs\to-do-list\server"
WshShell.Run "npm start", 0, false

WScript.Sleep 5000

Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\xampp\htdocs\to-do-list"
WshShell.Run "npm start", 0, false

WScript.Sleep 2000
WshShell.Run "http://localhost:3000"
