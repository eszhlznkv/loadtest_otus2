import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    scenarios: {
        my_web_test: {
            executor: 'constant-arrival-rate',
            rate: 60,
            timeUnit: '1m', // 90 iterations per minute, i.e. 1.5 RPS
            duration: '1m',
            preAllocatedVUs: 10, // the size of the VU (i.e. worker) pool for this scenario
            exec: 'webtest', // this scenario is executing different code than the one above!
        },
        my_api_test_1: {
            executor: 'constant-arrival-rate',
            rate: 120,
            timeUnit: '1m', // 90 iterations per minute, i.e. 1.5 RPS
            duration: '1m',
            preAllocatedVUs: 10, 
            exec: 'apitest', 
        },
    },
    discardResponseBodies: true,
    thresholds: {
        'http_req_duration': ['p(95)<2500', 'p(99)<3500'],

    },
};

export function webtest() {
    http.get('https://test.k6.io/');
}

export function apitest() {
    http.get('https://test.k6.io/contacts.php');
}
