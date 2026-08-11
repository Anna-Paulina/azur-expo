# Azur — projet Expo

Pardon pour la confusion précédente — voici la vraie version Expo, comme pour HitchLog.
L'appli entière (HTML/CSS/JS) est intégrée dans `assets/azurContent.js` et affichée dans une
`react-native-webview` locale (`source={{ html }}`), donc rien à charger depuis un fichier
séparé, rien à mettre en asset Metro, et aucun accès réseau requis.

## Installation

```bash
cd azur-expo
npm install
```

## Option A — build cloud avec EAS (pas besoin du SDK Android en local)

```bash
npx eas login
npx eas build:configure -p android
npx eas build -p android --profile preview
```

`eas build:configure` va créer un `eas.json` — choisissez le profil **preview**
(ou ajoutez-y `"buildType": "apk"` sous `android`, sinon EAS génère un `.aab` par défaut).
Exemple d'`eas.json` minimal à coller si besoin :

```json
{
  "build": {
    "preview": {
      "android": { "buildType": "apk" }
    }
  }
}
```

EAS compile dans le cloud et vous donne un lien de téléchargement direct pour le `.apk`
une fois le build terminé (`npx eas build -p android --profile preview` affiche le lien,
ou consultez https://expo.dev sous votre compte).

## Option B — build local (comme pour HitchLog, avec votre SDK Android déjà en place)

```bash
npx expo prebuild -p android
cd android
./gradlew assembleDebug
```

APK dans `android/app/build/outputs/apk/debug/app-debug.apk`.

## Aperçu rapide (Expo Go)

```bash
npx expo start
```

Scannez le QR code avec Expo Go sur le téléphone pour prévisualiser sans build — pratique
pour vérifier l'affichage avant de lancer un build complet.

## Mettre à jour le contenu

Le contenu web vit entièrement dans `assets/azurContent.js` (une seule constante `AZUR_HTML`).
Si vous modifiez l'appli plus tard, régénérez ce fichier à partir de vos nouveaux
`azur.html` / `app.js` / `ui.js` (fusionner les scripts inline puis `JSON.stringify`),
ou redemandez-le-moi.
