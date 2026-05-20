# SpotifyMap - Music Second Brain

This repository is scaffolded as a Quartz 4 digital garden for mapping Spotify songs, artists, genres, and lyric notes with Obsidian-style wiki-links.

## Install

```bash
npm install
```

## Local development

Run Quartz locally with live rebuild + preview server:

```bash
npx quartz build --serve
```

## Content structure

- `content/songs/` for song notes
- `content/artists/` for artist notes
- `content/genres/` for genre notes

Starter notes already include wiki-links like `[[The Weeknd]]` and `[[Synthwave]]` so the graph view has immediate connected data.

## Generate Markdown from song JSON

Use the included Node.js script to turn mocked Spotify song data into Quartz notes:

```bash
node ./scripts/generate-quartz-markdown.mjs ./scripts/sample-song-data.json
```

The script accepts either:

- a JSON file path containing an array of song objects
- stdin JSON, for example: `cat songs.json | node ./scripts/generate-quartz-markdown.mjs`

Expected input shape:

```json
[
  {
    "trackName": "Blinding Lights",
    "artistName": "The Weeknd",
    "genre": "Synthwave",
    "spotifyUrl": "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
    "lyrics": "Optional lyrics go here"
  }
]
```

Running the script will:

- create or update song notes in `content/songs/`
- create missing placeholder artist notes in `content/artists/`
- create missing placeholder genre notes in `content/genres/`
