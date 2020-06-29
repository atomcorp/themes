import json

#Opens the original file
names = open(r'app\src\components\Credits\Credits.md')
namesText = names.read()
namesList = namesText.split('\n')

#Opens the file and resets to a blank line
infoFile = open(r'app\src\components\Credits\namesAndThemes.json', 'wt')
infoFile.write('')
infoFile.close()
#Reopens the file to write the output
infoFile = open(r'app\src\components\Credits\namesAndThemes.json', 'at')

#Declares variables and files for parsing
namesAndCreators = {}
themeNamesBuffer = open(r'server\themes.json')
OGThemes = json.load(themeNamesBuffer)
themes = list(map(lambda x : x['name'], OGThemes))

def credit(variable):
    print(variable)

    for i in range(len(namesList)):
        line = namesList[i]
        lineWords = line.split()

        for e in range(len(lineWords)):
            return {
                "name": variable,
                "note": line if variable.split()[0] == lineWords[e] else # fix what to put here
            }

namesAndCreators['Credits'] = list(map(credit, themes))

json = json.dumps(namesAndCreators, indent = 4, sort_keys = True)
infoFile.write(json)