import sys
import os
import json
from mira_sdk import MiraClient, Flow
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

api_key = os.getenv("MIRA_API_KEY")

# Initialize the client
client = MiraClient(config={"API_KEY": api_key})

flow = Flow(source="flow.yaml")

# Get the topic from the command-line arguments
topic = sys.argv[1]

print("Topic:", topic)

# Hardcoded artist (you can also pass it as an argument if needed)
# artist = "Ed Sheeran"

# Input for Mira flow
input_dict = {"topic": topic}


response = client.flow.test(flow, input_dict)

result = response['result']

# Split the string into lines
lines = result.split('\n')

# Filter lines that start with "Song:"
songs = [line for line in lines if line.startswith('Song:')]

# Extract song names and artists
parsed_songs = []
for song in songs:
    parts = song.split(', Artist: ')
    song_name = parts[0].replace('Song: ', '').strip(' "')
    artist_name = parts[1].strip()
    parsed_songs.append({'song': song_name, 'artist': artist_name})

# Output the structured data
for item in parsed_songs:
    print(f"Song: {item['song']}, Artist: {item['artist']}")

