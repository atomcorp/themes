import json
import re

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

#Declares variables and files for parsing
creditsStart = 0
creditsEnd = 0
namesAndCreators = {}
namesAndCreators['Credits'] = []
_OGThemes = open(r'C:\Users\Andrey\source\repos\themes\server\themes.json')
OGThemes = json.load(_OGThemes)
themes = []

for i in range(len(OGThemes)):
    OGTheme = OGThemes[i]
    themes.append(OGTheme['name'])

print(themes)

for i in range(len(namesList)):
    if(namesList[i] == '## Credits'):
        creditsStart = i

    if(namesList[i] == 'If there are other color schemes you\'d like to see included, drop me a line!'):
        creditsEnd = i
    
print(str(creditsStart) + ' ' + str(creditsEnd))

for i in range(creditsStart, creditsEnd):
    line = namesList[i]
    print(line)

    for e in range(len(themes)):
        whatToFind = "^" + themes[e] + "$"
        themeName = re.search(whatToFind, line)

        namesAndCreators.append({
            "name": themeName.string() if themeName else 'Not Found',
            "note": line
        })

print(namesAndCreators)
json = json.dumps(namesAndCreators, indent = 4, sort_keys = True)
infoFile.write(json)