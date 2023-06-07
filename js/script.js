document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('screen');
    const input = document.getElementById('input');
  
    function printCommand(command) {
      screen.innerHTML += '<p><span class="prompt">$&gt;</span> ' + command + '</p>';
    }
  
    function printOutput(output) {
      screen.innerHTML += '<p>' + output + '</p>';
    }
  
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const command = input.value.trim();
        input.value = '';
        printCommand(command);
        executeCommand(command);
        screen.scrollTop = screen.scrollHeight;
      }
    });
  
    function executeCommand(command) {
      command = command.toLowerCase();
      let response = '';
  
      switch (command) {
        case 'help':
          response = 'Available commands: <br>- help <br>- youtube <br>- twitch <br>- goto-page <number> <br>- goto-url <br>- clear <br>- time <url> <br>- date <br>- version';
          break;
        case 'date':
          response = new Date().toDateString();
          break;
        case 'time':
          response = new Date().toLocaleTimeString();
          break;
        case 'version':
          response = 'pillowyTerm v0.4';
          break;
          case 'twitch':
            const twitchUrl = 'https://twitch.tv/pillowy';
            window.open(twitchUrl, '_blank');
            response = `Redirecting to the best streamer`;
            break;
          case 'youtube':
            const url = 'https://bit.ly/pillowyiscool';
            window.open(url, '_blank');
            response = `Redirecting to the best youtube channel`;
            break;
            case 'clear':
              screen.innerHTML = '';
              break;
              default:
                if (command.startsWith('goto-url')) {
                  const url = command.slice(9).trim();
                  if (url) {
                    if (url.startsWith('http://') || url.startsWith('https://')) {
                      window.open(url, '_blank');
                      response = 'Opening URL: ' + url;
                    } else {
                      response = 'Invalid URL. Make sure to include "http://" or "https://"';
                    }
                  } else {
                    response = 'Invalid command. Usage: goto-url <url>';
                  }
                } else if (command.startsWith('goto-page')) {
                  const page = command.slice(10).trim();
                  if (page === 'info') {
                    const infoPageUrl = 'info.html';
                    window.open(infoPageUrl, '_self');
                    response = 'Opening info page';
                  } else if (page && !isNaN(page)) {
                    const pageUrl = `${page}.html`;
                    window.open(pageUrl, '_self');
                    response = 'Opening page: ' + pageUrl;
                  } else {
                    response = 'Invalid command. Usage: goto-page <number> or goto-page info';
                  }
                } else {
                  response = 'Command not recognized. Type "help" to see available commands.';
                }
                break;
            }
        
            printOutput(response);
          }
        });