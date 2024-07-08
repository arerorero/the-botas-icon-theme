import fs from 'fs/promises';

async function deleteTest(){
    try{
        await fs.rm('test', {recursive: true});
    }catch{
        console.log('Folder does not exists');
    }
}
await deleteTest()