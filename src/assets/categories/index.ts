import bebidas from "./bebidas.png";
import adega from "./adega.png";
import tabacaria from "./tabacaria.png";
import conveniencia from "./conveniencia.png";
import mercearia from "./mercearia.png";
import subRefrigerantes from "./sub-refrigerantes.png";
import subSucos from "./sub-sucos.png";
import subEnergeticos from "./sub-energeticos.png";
import subAgua from "./sub-agua.png";
import subCervejas from "./sub-cervejas.png";
import subVinhos from "./sub-vinhos.png";
import subDestilados from "./sub-destilados.png";
import subEspumantes from "./sub-espumantes.png";
import subCigarros from "./sub-cigarros.png";
import subSeda from "./sub-seda.png";
import subEssencias from "./sub-essencias.png";
import subAcessorios from "./sub-acessorios.png";
import subSnacks from "./sub-snacks.png";
import subSorvetes from "./sub-sorvetes.png";
import subDoces from "./sub-doces.png";
import subDescartaveis from "./sub-descartaveis.png";
import subCarvaoGelo from "./sub-carvao-gelo.png";
import subEnlatados from "./sub-enlatados.png";
import subBiscoitos from "./sub-biscoitos.png";
import subHigiene from "./sub-higiene.png";

export const categoryImages: Record<string, string> = {
  cat1: bebidas,
  cat2: adega,
  cat3: tabacaria,
  cat4: conveniencia,
  cat5: mercearia,
};

export const subcategoryImages: Record<string, string> = {
  sub1a: subRefrigerantes,
  sub1b: subSucos,
  sub1c: subEnergeticos,
  sub1d: subAgua,
  sub2a: subCervejas,
  sub2b: subVinhos,
  sub2c: subDestilados,
  sub2d: subEspumantes,
  sub3a: subCigarros,
  sub3b: subSeda,
  sub3c: subEssencias,
  sub3d: subAcessorios,
  sub4a: subSnacks,
  sub4b: subSorvetes,
  sub4c: subDoces,
  sub4d: subDescartaveis,
  sub5a: subCarvaoGelo,
  sub5b: subEnlatados,
  sub5c: subBiscoitos,
  sub5d: subHigiene,
};
