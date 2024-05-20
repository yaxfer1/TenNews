import os
os.environ["PINECONE_API_KEY"] = "secret"
# console.anthropic.com
# platform.openai.com
os.environ["OPENAI_API_KEY"] = "secret"
OPENAI_API_KEY = "secret"
from langchain.embeddings.openai import OpenAIEmbeddings

embed = OpenAIEmbeddings(model="text-embedding-3-small")

from pinecone import Pinecone

# configure client
pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])

from pinecone import ServerlessSpec

spec = ServerlessSpec(
    cloud="aws", region="us-east-1"
)


import time

index_name = "ragas-evaluation"


# connect to index
index = pc.Index(index_name)
time.sleep(1)

from langchain.agents import tool

@tool
def arxiv_search(query: str) -> str:
    """Use this tool when answering questions about AI, machine learning, data
    science, or other technical questions that may be answered using arXiv
    papers.
    """
    # create query vector
    xq = embed.embed_query(query)
    # perform search
    out = index.query(vector=xq, top_k=5, include_metadata=True)
    # reformat results into string
    results_str = "\n---\n".join(
        [x["metadata"]["text"] for x in out["matches"]]
    )
    return results_str

tools = [arxiv_search]

# view index stats

from langchain import hub


from langchain.chains.conversation.memory import ConversationBufferWindowMemory

# conversational memory
conversational_memory = ConversationBufferWindowMemory(
    memory_key='chat_history',
    k=5,
    return_messages=True
)
from langchain.chat_models import ChatOpenAI


# completion llm
llm = ChatOpenAI(
    openai_api_key=OPENAI_API_KEY,
    model_name='gpt-4-turbo',
    temperature=0.0
)

from langchain.agents import initialize_agent

agent = initialize_agent(
    agent='conversational-react-description',
    tools=tools,
    llm=llm,
    verbose=True,
    max_iterations=3,
    early_stopping_method='generate',
    memory = conversational_memory,
    return_intermediate_steps =True
)
