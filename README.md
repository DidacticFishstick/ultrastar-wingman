# Ultrastar Wingman

![banner](banner.png)

## Introduction

Welcome to the official repository of **Ultrastar Wingman**, an enhancement tool for the popular karaoke software **Ultrastar Deluxe**. This tool is designed to elevate your karaoke experience by adding a user-friendly interface for downloading and viewing songs from any phone on the network, and providing detailed performance statistics.

## Features

- **Remote Song Management**: Download and view songs directly from any phone or device connected to the network.
- **Performance Statistics**: Track your karaoke performance with insightful statistics.
- **User-Friendly Interface**: A sleek and intuitive interface for an enhanced user experience.
- **Cross-Platform Compatibility**: Designed to work seamlessly with various devices.

## Getting Started

### Prerequisites

- [UltraStar Deluxe](https://usdx.eu/) installed on your system.
- (Optional) Another network-enabled device (e.g., smartphone, tablet).

### Installation

#### Windows

##### Installer

1. Download and run the latest installer from the [releases](https://github.com/DidacticFishstick/ultrastar-wingman/releases)
2. Run the application
3. Enter your [usdb.animux.de](https://usdb.animux.de) credentials on first startup
4. Locate the config file at `C:/Users/<user>/AppData/Local/Ultrastar Wingman/config.ini` and change the settings to fit your setup

##### Manually

1. Install [Python](https://www.python.org/) on your system
2. Download [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [ffmpeg](https://ffmpeg.org/)
3. Clone the repository:
    ```shell
    git clone https://github.com/DidacticFishstick/ultrastar-wingman.git
    ```
4. Navigate to the project directory: `cd ultrastar-wingman`
5. Install the required python dependencies
    ```shell
   pip install -r requirements.txt
   ```
6. Create a `config.ini` from the example `config.ini.windows_example` and change the settings to fit your setup

#### macOS

1. Install [brew](https://brew.sh/) and Python
2. Install the required system dependencies
    ```shell
    brew install ffmpeg yt-dlp
    ```
3. Clone the repository:
    ```shell
    git clone https://github.com/DidacticFishstick/ultrastar-wingman.git
    ```
4. Navigate to the project directory: `cd ultrastar-wingman`
5. Install the required python dependencies
    ```shell
   pip install -r requirements.txt
   ```
6. Create a `config.ini` from the example `config.ini.mac_example` and change the settings to fit your setup

#### Linux

TBD

## Usage

- Start the Wingman: `python main.py`
- **Access the UI**: Ensure your device is on the same network as your UltraStar Deluxe setup. Open the provided URL on your device's browser. This is either `http://localhost:8080` if your browser is on your UltraStar Deluxe system, otherwise it will be `http://<ultrastar-system-ip>:8080`
- **Download and View Songs**: Browse the song library and select songs to download or view.
- **Assign Players**: Assign People to UltraStar Deluxe Players directly in the Web Interface.

## Configuration

All configuration can be done in the `config.ini` file.
Usually this file is in the same directory as the script.
If the application was installed using the Windows installer, you can find the configuration file at `C:/Users/<user>/AppData/Local/Ultrastar Wingman/config.ini`

### USDB Section

This section contains credentials for accessing https://usdb.animux.de.
You will need to create an account to be able to download songs.

| Key        | Description                              |
|------------|------------------------------------------|
| `username` | Your username for https://usdb.animux.de |
| `password` | Your password for https://usdb.animux.de |

### USDX Section

This section is for configuring paths related to UltraStar Deluxe.

If you are using a standard installation of UltraStar Deluxe, you probably don't need to change these.

| Key                | Description                                              |
|--------------------|----------------------------------------------------------|
| `usdx_path`        | The path to the UltraStar Deluxe executable              |
| `usdx_config_file` | The path to the configuration file of UltraStar Deluxe   |
| `usdx_avatars_dir` | The directory path where UltraStar Deluxe stores avatars |
| `usdx_songs_dir`   | The directory path where UltraStar Deluxe stores songs   |

### SETUP Section

This section includes settings related to your actual setup.

| Key      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `colors` | A comma seperated list of colors (e.g. `colors = gray,dark_blue,yellow,flame`) that is used when entering player names.<br>You can assign colors for each input to make it easier to match the players to your input devices. The number of colors will also set the number of players.<br>Options are `blue`, `brown`, `cyan`, `dark_blue`, `flame`, `gray`, `green`, `green_yellow`, `harlequin`, `orange`, `orchid`, `pink`, `rainbow`, `red`, `sky`, `violet`, `yellow` |

### OTHER Section

This section includes various other configurations.

This section is not needed when using the Windows installer.

| Key            | Description                                                              |
|----------------|--------------------------------------------------------------------------|
| `players_file` | The file name where player information is stored (default `players.txt`) |
| `youtube_dl`   | The path to the `yt-dlp` executable used for downloading videos          |
| `ffmpeg`       | The path to the `ffmpeg` executable, used for multimedia processing      |

## Contributing

We welcome contributions from the community! If you're interested in improving Ultrastar Wingman, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Submit a Pull Request.

## Support

For support, questions, or feedback, please open an issue in the repository.

## License

This project is licensed under the [GPLv3](LICENSE).

## Acknowledgments

- Thanks to the UltraStar Deluxe team for their fantastic karaoke platform.
- Special thanks to all our contributors and supporters.
