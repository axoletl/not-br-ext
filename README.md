# Not-br (Chrome) Extension
✨This is an extension implementation of [not-BR](https://github.com/axoletl/not-br/) for (currently) Chrome.  
The extension is still in an **early stage!** To load it:
1. Download **"Source Code (zip)"** from the [releases page](https://github.com/axoletl/not-br-ext/releases/tag/main)
2. Extract its contents wherever
3. On Google Chrome, go to `chrome://extensions/`
4. Check **"Developer mode"** in the top right hand corner on
5. Click **"Load unpacked"**, then navigate to `[EXTRACTED PATH]\not-br-ext-main\not-br-ext-main\chrome`
6. Click Select Folder, you're done!
  
<br />

💽To use the extension:
- Right click on any website and click **"Convert this page"** to convert it to not-BR
- To adjust settings, click the notBR icon to open the extension popup panel from your extension toolbar (may need to be pinned from extensions list, see [here](https://www.howtogeek.com/683099/how-to-pin-and-unpin-extensions-from-the-chrome-toolbar/))
- You can also convert pages from the popup panel
  
<br />

📑Known Issues and limitations:
- Page will not auto convert if it is loaded in the background on another tab
- Converted pages cannot be live updated by the settings, this is a performance limitation, but a smarter way to do this may come up later
- Pages may just get really messed up by the conversion, please feel free to report these as things can be done to mitigate this, but please be aware that I can't selectively change features for specific webpages, every webpage is structured differently because the web is built on silly string!
- Text using angle brackets(<>) might get messed up, this is due to the way the parsing works, testing solutions for this, sorry!
  
<br />
  
✏Let me know either on this repo's issues page or at this [Twitter thread](https://twitter.com/axoletlmusic/status/1530383026597003265)