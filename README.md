## full-icu Repro

This repository contains a very minimal reproduction of the problem I'm experiencing with [now](https://github.com/zeit/now) and [full-icu](https://github.com/unicode-org/full-icu-npm).

### Running the repro

Running the next project locally with `$ now dev` will work fine.
Deploying to Vercel with `$ now` will fail with

```
17:02:37.101  Retrieving list of deployment files...
17:02:37.436  Downloading 8 deployment files...
17:02:37.658  /node12/bin/node: could not initialize ICU (check NODE_ICU_DATA or --icu-data-dir parameters)
17:02:37.682  /node12/bin/node: could not initialize ICU (check NODE_ICU_DATA or --icu-data-dir parameters)
17:02:37.689  /node12/bin/node: could not initialize ICU (check NODE_ICU_DATA or --icu-data-dir parameters)
17:02:37.696  /node12/bin/node: could not initialize ICU (check NODE_ICU_DATA or --icu-data-dir parameters)
17:02:38.704  /node12/bin/node: could not initialize ICU (check NODE_ICU_DATA or --icu-data-dir parameters)
17:02:38.707  Done with "package.json"
```

### Additional Info

The problem is caused by the property `.build.env.NODE_ICU_DATA`. If this configuration is removed,
the node runtime doesn't fulfill the [requirements of react-intl](https://formatjs.io/docs/runtime-requirements#nodejs).
This will cause this error serverside:

```
[React Intl Error MISSING_DATA] Missing locale data for locale: "de" in Intl.NumberFormat. Using default locale: "en" as fallback. See https://github.com/formatjs/react-intl/blob/master/docs/Getting-Started.md#runtime-requirements for more details
```

And this error clientside:

```
Warning: Text content did not match. Server: "4/29/2020" Client: "29.4.2020"
```

### Workaround

As a workaround I am currently using is using [Intl.js](https://github.com/andyearnshaw/Intl.js#intljs-and-node).
But this is not the way react-intl recommends.
