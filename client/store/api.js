import LRU from 'lru-cache'
import Vue from 'vue'
const superagent = require('superagent')

function fetch (arg) {
    const url = arg.ajaxurl || ''
    const datas = arg.querydata ? arg.querydata : {}
    return new Promise((resolve, reject) => {
        superagent
        .get(url)
        .query(datas)//{name:'An',age:20,sex:'male'}
        .end((err,response) => {
            if (err) {
                console.log('error!' + err)
                return
            }
            resolve(response.body)
        })
    })
}

export default function fetchItem (arg) {
    return fetch(arg)
}