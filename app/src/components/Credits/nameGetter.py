import json
import re

#Opens the credits markdown file
names = open(r'app\src\components\Credits\Credits.md')
namesList = names.read().split('\n')

#Opens the output file for writing
infoFile = open(r'app\src\components\Credits\namesAndThemes.json', 'wt')

#Declares main variables
namesAndCreators = {}
themesBuffer = open(r'server\themes.json')
themes = json.load(themesBuffer)

#Finds a match for every theme name in the credits file
#'r' is the current theme name
def credit(r):
    for i in range(len(namesList)):
        line = namesList[i]
        match = re.search(r['name'], line)

        if (match is None):
            continue
        else:
            break
                        
    return {
        'name': r['name'],
        'note': 'Not Found' if match is None else line,
        'dark': r['isDark']
    }

namesAndCreators['credits'] = list(map(credit, themes))

json = json.dumps(namesAndCreators, indent = 4, sort_keys = True)
infoFile.write(json)