pyinstaller --onefile --hide-console hide-early --add-data "../avatars;./avatars" --name=ultrastar-wingman --runtime-hook add_environment.py --icon=../static/icons/wingman.ico ../main.py
