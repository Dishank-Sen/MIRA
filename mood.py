from mira_sdk import MiraClient, Flow
from dotenv import load_dotenv
import os

load_dotenv() 
MIRA_API_KEY = os.getenv("MIRA_API_KEY")

# Initialize the client
client = MiraClient(config={"API_KEY": MIRA_API_KEY})
version = "1.0.0"
input_data = {
    "Mood": "sad",
    "Language": "hindi",
    "Favorite Artist": "jubin nautiyal"
}

# If no version is provided, latest version is used by default
if version:
    flow_name = f"@shricharan/music-recommender/{version}"
else:
    flow_name = "@shricharan/music-recommender"

result = client.flow.execute(flow_name, input_data)
print(result)