import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  constructor() { }

  queryInfo = {
    active: true,
    currentWindow: true
  };

  sendRequestToContentScripts(options, callback) {
    chrome.tabs.query(this.queryInfo, tabs => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, {text: 'count-images', options: options}, callback);
    });
  }

}
