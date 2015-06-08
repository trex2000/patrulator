# patrulator
Source code for patrulator proxy.
---------------------------------

1. **Rebuilding native modules (serialport):**

*Windows:*

*Linux:*

2. **Packaging application:**

*Windows:*
 zip files (excluding main folder).

*Linux:*
zip -r app.nw *

3. **Creating executable:**

*Windows:*
Command Line:
copy /b nw.exe+app.nw app.exe

Must be shipped with: icudtl.dat and nw.pak

*Linux:*
