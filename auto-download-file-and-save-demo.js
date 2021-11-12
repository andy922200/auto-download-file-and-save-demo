const demoTypeList = [
  { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png' },
  { type: 'pdf', url: 'https://abseil.io/resources/swe_at_google.2.pdf' },
  { type: 'xlsx', url: 'https://www.google.com/help/hc/downloads/sa360/Location-Language-Codes-GoogleAds.xlsx' },
  { type: 'doc', url: 'https://www-03.ibm.com/software/sla/sladb.nsf/8bd55c6b9fa8039c86256c6800578854/6fb5af3e1e25830e8525843200220908/$FILE/i126-8560-01_07-2019_zh_TW.docx' },
  { type: 'txt', url: 'https://www.easy168.tw/urllist.txt' },
  { type: 'ppt', url: 'https://sysh.tc.edu.tw/var/file/64/1064/img/545856627.ppt' }
]

demoTypeList.forEach(item => {
  initBtnDownload(item)
})

function initBtnDownload(item){
  switch (item.type){
    case 'txt':
      document.querySelector(`#download-btn-${item.type}`)
        .addEventListener('click', async function (event) {
          try {
            const txtRaw = await (await fetch(item.url)).text()
            const txtBlob = new Blob([txtRaw], { type: "text/plain;charset=utf-8" })
            const txtURL = URL.createObjectURL(txtBlob)
            const aLinkDOM = document.createElement('a')
            aLinkDOM.href = txtURL
            aLinkDOM.download = 'demo.txt'
            document.body.appendChild(aLinkDOM)
            aLinkDOM.click()
            document.body.appendChild(aLinkDOM)
          } catch (err) {
            console.log(err)
          }
        })
      break
      case 'image':
        document.querySelector(`#download-btn-${item.type}`)
          .addEventListener('click', async function (event) {
            try {
              const image = await fetch(item.url)
              const imageBlob = await image.blob()
              const imageURL = URL.createObjectURL(imageBlob)
              const aLinkDOM = document.createElement('a')
              aLinkDOM.href = imageURL
              aLinkDOM.download = ''
              document.body.appendChild(aLinkDOM);
              aLinkDOM.click()
              document.body.removeChild(aLinkDOM);
              URL.revokeObjectURL(imageURL)
            } catch (err) {
              console.log(err)
            }
          })
      break
      default:
        document.querySelector(`#download-btn-${item.type}`).addEventListener('click', function (event) {
          const aLinkDom = document.createElement('a')
          aLinkDom.href = item.url
          aLinkDom.download = ''
          document.body.appendChild(aLinkDom);
          aLinkDom.click()
          document.body.removeChild(aLinkDom);
        })
      break
  }
}
