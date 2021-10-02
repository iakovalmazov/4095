let headers = document.getElementsByName('headers')
let acceptOptions = document.getElementsByName('acceptOptions')
let contentTypeOptions = document.getElementsByName('contentTypeOptions')

document.onclick = function() {
  if(headers[0].checked) {
    for(let i = 0; i < acceptOptions.length; i++) {
      acceptOptions[i].removeAttribute('disabled')
    }
  } else {
    for(let i = 0; i < acceptOptions.length; i++) {
      acceptOptions[i].setAttribute('disabled', 'disabled')
    }
  }

  if(headers[1].checked) {
    for(let i = 0; i < contentTypeOptions.length; i++) {
      contentTypeOptions[i].removeAttribute('disabled')
    }
  } else {
    for(let i = 0; i < contentTypeOptions.length; i++) {
      contentTypeOptions[i].setAttribute('disabled', 'disabled')
    }
  }
}
