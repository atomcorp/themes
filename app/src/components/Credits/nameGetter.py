import json

#Opens the credits markdown file
names = open(r'app\src\components\Credits\Credits.md')
namesList = names.read().split('\n')

#Opens the output file for writing
infoFile = open(r'app\src\components\Credits\namesAndThemes.json', 'wt')

#Declares variables and files for parsing
namesAndCreators = {}
themesBuffer = open(r'server\themes.json')
themes = json.load(themesBuffer)

#Finds a match for every theme name in the credits file
#'r' is the current theme name
def credit(r):
    line = ''

    for i in range(len(namesList)):
        _line = namesList[i]
        lineWords = _line.split()

        for e in range(len(lineWords)):
            try:
                if (r['name'].split()[0] == lineWords[e] and r['name'].split()[1] == lineWords[e + 1]):
                    line = _line
            except:
                if (r['name'].split()[0] == lineWords[e]):
                    line = _line

    return {
        'name': r['name'],
        'note': 'Not Found' if line == '' else line,
        'dark': r['isDark']
    }

namesAndCreators['credits'] = list(map(credit, themes))

json = json.dumps(namesAndCreators, indent = 4, sort_keys = True)
infoFile.write(json)