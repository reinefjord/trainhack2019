import {FakeClient} from './fake_client.js';

// Export a fake so that we can develop locally without a real backend.
export let client = new FakeClient();

export function setClient(newClient) {
    client = newClient;
}