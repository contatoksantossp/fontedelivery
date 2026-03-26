import cocaCola from "./coca-cola.png";
import guaranaAntarctica from "./guarana-antarctica.png";
import redBull from "./red-bull.png";
import aguaCrystal from "./agua-crystal.png";
import skol from "./skol.png";
import heineken from "./heineken.png";
import brahma from "./brahma.png";
import vinhoCasillero from "./vinho-casillero.png";
import absolut from "./absolut.png";
import marlboro from "./marlboro.png";
import sedaSmoking from "./seda-smoking.png";
import essenciaNarguile from "./essencia-narguile.png";
import isqueiroBic from "./isqueiro-bic.png";
import doritos from "./doritos.png";
import trident from "./trident.png";
import picole from "./picole.png";
import carvao from "./carvao.png";
import gelo from "./gelo.png";

export const productImages: Record<string, string> = {
  p1: cocaCola,
  p2: guaranaAntarctica,
  p3: redBull,
  p4: aguaCrystal,
  p5: skol,
  p6: heineken,
  p7: brahma,
  p8: vinhoCasillero,
  p9: absolut,
  p10: marlboro,
  p11: sedaSmoking,
  p12: essenciaNarguile,
  p13: isqueiroBic,
  p14: doritos,
  p15: trident,
  p16: picole,
  p17: carvao,
  p18: gelo,
};

// Variantes usam a mesma imagem do produto pai
export const variantImages: Record<string, string> = {
  v1a: cocaCola, v1b: cocaCola, v1c: cocaCola,
  v2a: guaranaAntarctica, v2b: guaranaAntarctica,
  v3a: redBull, v3b: redBull,
  v4a: aguaCrystal, v4b: aguaCrystal,
  v5: skol,
  v6a: heineken, v6b: heineken,
  v7: brahma,
  v8: vinhoCasillero,
  v9a: absolut, v9b: absolut,
  v10: marlboro,
  v11: sedaSmoking,
  v12a: essenciaNarguile, v12b: essenciaNarguile,
  v13: isqueiroBic,
  v14a: doritos, v14b: doritos,
  v15: trident,
  v16a: picole, v16b: picole,
  v17a: carvao, v17b: carvao,
  v18a: gelo, v18b: gelo,
};
