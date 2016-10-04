import LRU from 'lru-cache'
import Vue from 'vue'
const superagent = require('superagent')

function fetch (arg) {
    let url = arg.ajaxurl || ''
    let datas = arg.querydata ? arg.querydata : {}
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

/*function getTopPlaylist(){
    superagent
    .get('http://127.0.0.1:3333/topplaylistapi/')
    .query({})
    .end((err,response) => {
        if (err) {
            console.log('error!' + err)
            return
        }
        console.log('playlist:::'+response.body)
    })
}*/

export default function fetchItem (arg) {
    return fetch(arg)
}