import sys
from mira_sdk import MiraClient, Flow
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("MIRA_API_KEY")
client = MiraClient(config={"API_KEY": api_key})
flow = Flow(source="flow5.yaml")

def generate_theory(topic):
    input_dict = {"topic": topic}
    response = client.flow.test(flow, input_dict)
    return response

if __name__ == '__main__':
    topic = sys.argv[1]
    theory = generate_theory(topic)
    print(theory)
