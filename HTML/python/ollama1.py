from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.llms.ollama import Ollama

# 配置 Ollama 连接（替换为你的 Windows IP）
llm = Ollama(model="codellama:13b-code", base_url="http://172.20.0.20:11434")

# 读取本地代码目录（替换为你的解压路径）
code_dir = r"D:\work\Git-2008"
documents = SimpleDirectoryReader(
    code_dir,
    exclude=["node_modules", ".venv", "dist", ".git"]  # 排除冗余目录
).load_data()

# 创建代码索引（加速分析）
index = VectorStoreIndex.from_documents(documents, llm=llm)
query_engine = index.as_query_engine(llm=llm)

# 执行分析（可修改提问内容）
analysis_query = """
请详细分析这个代码目录：
1. 项目的核心功能和技术栈；
2. 主要模块的调用关系；
3. 代码中存在的问题和改进建议；
4. 核心文件的逻辑说明。
"""
response = query_engine.query(analysis_query)

# 输出分析结果
print("=== 代码目录分析报告 ===")
print(response)

# 可选：保存结果到文件
with open("code_analysis_report.txt", "w", encoding="utf-8") as f:
    f.write(str(response))