import requests
import json

#Opens the original file
names = open(r'C:\Users\Andrey\source\repos\iTerm2-Color-Schemes\README.md')
namesText = names.read()
namesList = namesText.split('\n')

#Opens the file and resets to a blank line
infoFile = open(r'C:\Users\Andrey\source\repos\themes\app\src\components\Credits\namesAndThemes.json', 'wt')
infoFile.write('')
infoFile.close()
#Reopens the file to write the output
infoFile = open(r'C:\Users\Andrey\source\repos\themes\app\src\components\Credits\namesAndThemes.json', 'at')
themes = []
startCredits = namesList.index('## Credits')
endCredits = namesList.index('If there are other color schemes you\'d like to see included, drop me a line!')
namesAndCredits = {}
namesAndCredits['Credits'] = []


for i in range(len(namesList)):
    line = namesList[i].split()

    try:
        if (line[0] == '###'):
            themes.append(line[1:])
    except:
        continue

for i in range(startCredits, endCredits):
    _line = namesList[i].split()

    for a in range(len(_line)):
        for e in range(len(themes)):
            if (_line[a] == themes[e]):
                namesAndCredits['Credits'].append({
                    "name": str(themes[e]),
                    "credits": str(namesList[i])
                })
    
json = json.dumps(namesAndCredits, indent = 4, sort_keys = True)
infoFile.write(json)
print(json)