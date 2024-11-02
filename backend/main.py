import os
from fastapi import FastAPI  # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List # type: ignore``
from dotenv import load_dotenv # type: ignore

load_dotenv()

app = FastAPI()

allowed_origins = os.getenv("ALLOWED_ORIGINS")
if not allowed_origins:
    raise ValueError("ALLOWED_ORIGINS environment variable is not set.")

allowed_origins_list = [origin.strip() for origin in allowed_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[str]
    edges: List[Edge]

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_if_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }

def check_if_dag(nodes: List[str], edges: List[Edge]) -> bool:
    graph = {node: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)

    visited = {node: False for node in nodes}
    recursion_stack = {node: False for node in nodes}

    def has_cycle(node):
        visited[node] = True
        recursion_stack[node] = True

        for neighbor in graph[node]:
            if not visited[neighbor]:
                if has_cycle(neighbor):
                    return True
            elif recursion_stack[neighbor]:
                return True

        recursion_stack[node] = False
        return False

    for node in nodes:
        if not visited[node]:
            if has_cycle(node):
                return False

    return True
