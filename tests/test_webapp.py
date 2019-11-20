def test_index(client):
    resp = client.get('/')

    assert resp.status_code == 200
    assert 'Great' in resp.text
