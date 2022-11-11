import fs from 'fs'

const txtPath = 'sample.txt'

export const createData = () => {
    fs.appendFile(txtPath, 'new Datax\n', (item) => {
        console.log(item)
    })
}

export const readData = () => {
    const datas = fs.readFileSync(txtPath, 'utf-8')
    console.log(datas);
}