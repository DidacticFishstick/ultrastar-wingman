pyinstaller ^
    --onefile ^
    --add-data "../ultrastar-wingman/avatars;./avatars" ^
    --add-data "../ultrastar-wingman/frontend;./frontend" ^
    --add-data "executables;./executables" ^
    --add-data "../config.ini.windows_installation_template;./" ^
    --hidden-import=aiosqlite ^
    --name=ultrastar-wingman ^
    --runtime-hook add_environment.py ^
    --icon=app_icon.ico ^
    ../ultrastar-wingman/main.py

"D:\Program Files (x86)\Inno Setup 6\Compil32.exe" /cc windows_installer.iss