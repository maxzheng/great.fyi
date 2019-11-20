import pytest
from starlette.testclient import TestClient

from web.core import app


@pytest.fixture
def client():
    return TestClient(app)
