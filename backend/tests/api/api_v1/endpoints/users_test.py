import jwt
import pytest

from fastapi.testclient import TestClient



def test_get_user():
    ver = 'test'
    assert len(ver) == 4

def test_post_user():
    ver = 'test'
    assert len(ver) == 4
