from pathlib import Path

from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles


app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')


# XXX: For local development only. All APIs should go above this.
@app.get('/{ignored:path}', response_class=HTMLResponse)
async def index(request: Request, ignored: str):
    index_html = Path(__file__).parent.parent / 'static' / 'index.html'
    if index_html.exists():
        with index_html.open() as fh:
            return fh.read().replace('webapp.js', 'static/webapp.js')
    else:
        return 'API server'
