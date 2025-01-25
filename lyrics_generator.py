from mira_sdk import MiraClient, Flow
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

api_key = os.getenv("MIRA_API_KEY")

# Initialize the client
client = MiraClient(config={"API_KEY": api_key})

flow = Flow(source="flow3.yaml")

input_dict = {"input1": "thunder", "input2": "lightining", "input3": "wind" , "input4": "energy", "input5": "english"}

response = client.flow.test(flow, input_dict)

print(response)