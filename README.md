Dropbox Downloader
==================

A simple script to download files in the first level of a dropbox directory.

Create a `settings.json` file to use this tool:


    {
      "app_key":{
        "app_key":"KEY",
        "app_secret":"SECRET"
      },
      "access_token":{
        "oauth_token_secret":"TOKEN_SECRET",
        "oauth_token":"TOKEN",
        "uid":"UID"
      },
      "local_sync_dir":"/Users/sergiovilar/Desktop/torrents",
      "remote_sync_dir":"/Torrents"
    }
