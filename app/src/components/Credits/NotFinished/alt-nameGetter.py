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

#Declares variables for parsing
namesAndCreators = {}
namesAndCreators['Credits'] = []
themes = []

for i in range(len(namesList)):
    line = namesList[i].split()
    addend = ''

    try:
        if (line[0] == '###'):
            for e in range(1, len(line) - 1):
                addend += line[e] + ' '
    except:
        continue

    if (addend != ''):
        themes.append(addend)
    

print(themes)

json = json.dumps(namesAndCreators, indent = 4, sort_keys = True)
infoFile.write(json)