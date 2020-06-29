import json

#Opens the original file
names = open(r'app\src\components\Credits\README.md')
namesText = names.read()
namesList = namesText.split('\n')

#Opens the file and resets to a blank line
infoFile = open(r'app\src\components\Credits\namesAndThemes.json', 'wt')
infoFile.write('')
infoFile.close()
#Reopens the file to write the output
infoFile = open(r'app\src\components\Credits\namesAndThemes.json', 'at')

#Declares variables and files for parsing
creditsStart = 0
creditsEnd = 0
namesAndCreators = {}
namesAndCreators['Credits'] = []
_OGThemes = open(r'server\themes.json')
OGThemes = json.load(_OGThemes)
themes = []

for i in range(len(OGThemes)):
    OGTheme = OGThemes[i]
    themes.append(OGTheme['name'])

for i in range(len(namesList)):
    if(namesList[i] == '## Credits'):
        creditsStart = i

    if(namesList[i] == 'If there are other color schemes you\'d like to see included, drop me a line!'):
        creditsEnd = i

for i in range(creditsStart, creditsEnd):
    line = namesList[i]
    lineWords = line.split()

    for a in range(len(lineWords)):
        for e in range(len(themes)):
            if (lineWords[a] == themes[e]):
                print(str(lineWords) + ': ' + themes[e])

                themeObj = {
                    "name": themes[e],
                    "note": line
                }
                namesAndCreators['Credits'].append(themeObj)

json = json.dumps(namesAndCreators, indent = 4, sort_keys = True)
infoFile.write(json)