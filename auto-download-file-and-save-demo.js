const demoTypeList = [
  { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png' },
  { type: 'pdf', url: 'https://www.sony.com.tw/electronics/support/res/manuals/2681/26811875M.pdf' },
  { type: 'xlsx', url: 'https://www.google.com/help/hc/downloads/sa360/Location-Language-Codes-GoogleAds.xlsx' },
  { type: 'doc', url: 'https://www-03.ibm.com/software/sla/sladb.nsf/8bd55c6b9fa8039c86256c6800578854/6fb5af3e1e25830e8525843200220908/$FILE/i126-8560-01_07-2019_zh_TW.docx' },
  { type: 'txt', url: 'https://www.easy168.tw/urllist.txt' },
  { type: 'ppt', url: 'https://sysh.tc.edu.tw/var/file/64/1064/img/545856627.ppt' },
  { type: 'jquery-ajax', url: 'https://www.sony.com.tw/electronics/support/res/manuals/2681/26811875M.pdf' }
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
            aLinkDOM.dispatchEvent(new MouseEvent('click'))
            URL.revokeObjectURL(txtURL)
          } catch (err){
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
              aLinkDOM.dispatchEvent(new MouseEvent('click'))
              URL.revokeObjectURL(imageURL)
            } catch (err) {
              console.log(err)
            }
          })
      break
    case 'jquery-ajax':
      document.querySelector(`#download-btn-${item.type}`)
        .addEventListener('click', async function (event) {
          try {
            $.ajax({
              url: item.url,
              method: 'GET',
              xhrFields: {
                responseType: 'blob'
              },
              success: function (data) {
                const aLinkDOM = document.createElement('a')
                const url = URL.createObjectURL(data)
                aLinkDOM.href = url
                aLinkDOM.download = ''
                aLinkDOM.dispatchEvent(new MouseEvent('click'))
                URL.revokeObjectURL(url)
              }
            })
          } catch (err) {
            console.log(err)
          }
        })
      break
    default:
      document.querySelector(`#download-btn-${item.type}`).addEventListener('click', async function (event) {
        try{
          const aLinkDOM = document.createElement('a')
          aLinkDOM.href = item.url
          aLinkDOM.download = ''
          document.body.appendChild(aLinkDOM)
          aLinkDOM.dispatchEvent(new MouseEvent('click'))
        }catch(err){
          console.log(err)
        }
      })
    break
  }
}
