
process.env.CYCLIC_DB = 'CyclicDB'
const db = require('../src/')


const run = async function(){
    let res
    let users = db.collection('users')
    res = await users
   .item('asdf')
   .fragment('pending_hooks',`build_asdf`).set({
     app: 'asdfasdf',
     repo: {}
   })
   


    let animals = db.collection('animals')
    res = await animals.set('leo', {
        type:'cat',
        color:'orange'
    },{
        // $index: ['color']
    })

    // res = await animals.list()
    // res = await animals.latest()
    // res = await animals.index('color').find('orange')

    // res = await animals.item('cat').fragment('c').set({
    //     p:1,
    //     color:'orange'
    // },{
    //     $index : ['color']
    // })
    // res = await animals.index('color').find('orange')



    // res = await animals.delete('leo')
    
    // res = await CyclicDb.item('apps','a').set({
    //     name: 'mike',
    //     zip:19027,
    //     val: '',
    //     val2: ''
    // },{
    //     $index:['name']
    // })
    
    // res = await CyclicDb.item('apps','a').set({
    //     name: 'mike',
    //     zip:19027
    // },{
    //     $index:['name'],
    //     $unset:['val']
    // })

    // res = await CyclicDb.item('apps','a').get()
    // res = await CyclicDb.item('apps','a').fragment('bbb').set({
    //     abc:10
    // })
    // res = await CyclicDb.item('apps','a').fragment('bbb').get()
    // res = await CyclicDb.item('apps','a').fragment('bbb').list()
    // res = await CyclicDb.item('apps','a').indexes()


    // res = await CyclicDb.index('name').find('mike')

    // res = await CyclicDb.collection('apps').list()
    // res = await CyclicDb.collection('apps').latest()
    // res = await CyclicDb.collection('apps').item('a').get()
    // res = await CyclicDb.collection('apps').find('name','mike')

    console.log(res)
}

run()