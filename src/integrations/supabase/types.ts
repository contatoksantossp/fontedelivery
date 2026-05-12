export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      caixa_sessoes: {
        Row: {
          abertura: string
          entradas: number
          fechamento: string | null
          fundo_inicial: number
          id: string
          saidas: number
          saldo_esperado: number
          saldo_fechamento: number | null
          status: string
        }
        Insert: {
          abertura?: string
          entradas?: number
          fechamento?: string | null
          fundo_inicial?: number
          id?: string
          saidas?: number
          saldo_esperado?: number
          saldo_fechamento?: number | null
          status?: string
        }
        Update: {
          abertura?: string
          entradas?: number
          fechamento?: string | null
          fundo_inicial?: number
          id?: string
          saidas?: number
          saldo_esperado?: number
          saldo_fechamento?: number | null
          status?: string
        }
        Relationships: []
      }
      categorias: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          id: string
          imagem_url: string | null
          nome: string
          ordem: number
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id: string
          imagem_url?: string | null
          nome: string
          ordem?: number
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          imagem_url?: string | null
          nome?: string
          ordem?: number
          updated_at?: string
        }
        Relationships: []
      }
      cliente_enderecos: {
        Row: {
          bairro: string
          cep: string | null
          cidade: string | null
          cliente_id: string
          complemento: string | null
          created_at: string
          id: string
          numero: string | null
          principal: boolean
          rua: string
        }
        Insert: {
          bairro: string
          cep?: string | null
          cidade?: string | null
          cliente_id: string
          complemento?: string | null
          created_at?: string
          id: string
          numero?: string | null
          principal?: boolean
          rua: string
        }
        Update: {
          bairro?: string
          cep?: string | null
          cidade?: string | null
          cliente_id?: string
          complemento?: string | null
          created_at?: string
          id?: string
          numero?: string | null
          principal?: boolean
          rua?: string
        }
        Relationships: [
          {
            foreignKeyName: "cliente_enderecos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          apelido: string | null
          created_at: string
          data_cadastro: string
          id: string
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          apelido?: string | null
          created_at?: string
          data_cadastro?: string
          id: string
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          apelido?: string | null
          created_at?: string
          data_cadastro?: string
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      colaboradores: {
        Row: {
          ativo: boolean
          cargo: string
          cliente_id: string
          created_at: string
          data_inicio: string
          id: string
        }
        Insert: {
          ativo?: boolean
          cargo: string
          cliente_id: string
          created_at?: string
          data_inicio?: string
          id: string
        }
        Update: {
          ativo?: boolean
          cargo?: string
          cliente_id?: string
          created_at?: string
          data_inicio?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      compra_itens: {
        Row: {
          compra_id: string
          id: string
          nome: string
          qtd: number
          valor_unit: number
        }
        Insert: {
          compra_id: string
          id?: string
          nome: string
          qtd: number
          valor_unit: number
        }
        Update: {
          compra_id?: string
          id?: string
          nome?: string
          qtd?: number
          valor_unit?: number
        }
        Relationships: [
          {
            foreignKeyName: "compra_itens_compra_id_fkey"
            columns: ["compra_id"]
            isOneToOne: false
            referencedRelation: "fornecedor_compras"
            referencedColumns: ["id"]
          },
        ]
      }
      cupons: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          expiracao: string | null
          id: string
          pedido_minimo: number
          tipo: Database["public"]["Enums"]["cupom_tipo"]
          total_usos: number
          valor: number
        }
        Insert: {
          ativo?: boolean
          codigo: string
          created_at?: string
          expiracao?: string | null
          id: string
          pedido_minimo?: number
          tipo: Database["public"]["Enums"]["cupom_tipo"]
          total_usos?: number
          valor: number
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          expiracao?: string | null
          id?: string
          pedido_minimo?: number
          tipo?: Database["public"]["Enums"]["cupom_tipo"]
          total_usos?: number
          valor?: number
        }
        Relationships: []
      }
      enderecos_cache: {
        Row: {
          bairro: string
          cep: string | null
          cidade: string | null
          created_at: string
          id: string
          numero: string | null
          rua: string
        }
        Insert: {
          bairro: string
          cep?: string | null
          cidade?: string | null
          created_at?: string
          id: string
          numero?: string | null
          rua: string
        }
        Update: {
          bairro?: string
          cep?: string | null
          cidade?: string | null
          created_at?: string
          id?: string
          numero?: string | null
          rua?: string
        }
        Relationships: []
      }
      entregador_turnos: {
        Row: {
          created_at: string
          data: string
          diaria: number
          entregador_id: string | null
          entregas: number
          id: string
          nome: string
          pago: boolean
          total_bonificacoes: number
          total_taxas: number
          veiculo: string | null
        }
        Insert: {
          created_at?: string
          data?: string
          diaria?: number
          entregador_id?: string | null
          entregas?: number
          id: string
          nome: string
          pago?: boolean
          total_bonificacoes?: number
          total_taxas?: number
          veiculo?: string | null
        }
        Update: {
          created_at?: string
          data?: string
          diaria?: number
          entregador_id?: string | null
          entregas?: number
          id?: string
          nome?: string
          pago?: boolean
          total_bonificacoes?: number
          total_taxas?: number
          veiculo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entregador_turnos_entregador_id_fkey"
            columns: ["entregador_id"]
            isOneToOne: false
            referencedRelation: "entregadores"
            referencedColumns: ["id"]
          },
        ]
      }
      entregadores: {
        Row: {
          cliente_id: string
          cor: string
          created_at: string
          id: string
          online: boolean
          total_mes: number
          veiculo: string
        }
        Insert: {
          cliente_id: string
          cor?: string
          created_at?: string
          id: string
          online?: boolean
          total_mes?: number
          veiculo: string
        }
        Update: {
          cliente_id?: string
          cor?: string
          created_at?: string
          id?: string
          online?: boolean
          total_mes?: number
          veiculo?: string
        }
        Relationships: [
          {
            foreignKeyName: "entregadores_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      estoque_fila_espera: {
        Row: {
          cliente_nome: string
          contato: string | null
          data_solicitacao: string
          id: string
          variante_id: string | null
          variante_nome: string | null
        }
        Insert: {
          cliente_nome: string
          contato?: string | null
          data_solicitacao?: string
          id?: string
          variante_id?: string | null
          variante_nome?: string | null
        }
        Update: {
          cliente_nome?: string
          contato?: string | null
          data_solicitacao?: string
          id?: string
          variante_id?: string | null
          variante_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estoque_fila_espera_variante_id_fkey"
            columns: ["variante_id"]
            isOneToOne: false
            referencedRelation: "variantes"
            referencedColumns: ["id"]
          },
        ]
      }
      estoque_movimentos: {
        Row: {
          data_hora: string
          id: string
          observacao: string | null
          quantidade: number
          saldo_final: number
          tipo: Database["public"]["Enums"]["movimento_tipo"]
          variante_id: string
        }
        Insert: {
          data_hora?: string
          id?: string
          observacao?: string | null
          quantidade: number
          saldo_final: number
          tipo: Database["public"]["Enums"]["movimento_tipo"]
          variante_id: string
        }
        Update: {
          data_hora?: string
          id?: string
          observacao?: string | null
          quantidade?: number
          saldo_final?: number
          tipo?: Database["public"]["Enums"]["movimento_tipo"]
          variante_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "estoque_movimentos_variante_id_fkey"
            columns: ["variante_id"]
            isOneToOne: false
            referencedRelation: "variantes"
            referencedColumns: ["id"]
          },
        ]
      }
      faixas_taxa: {
        Row: {
          id: string
          km_final: number
          km_inicial: number
          preco: number
          tipo: Database["public"]["Enums"]["faixa_tipo"]
        }
        Insert: {
          id: string
          km_final: number
          km_inicial: number
          preco: number
          tipo: Database["public"]["Enums"]["faixa_tipo"]
        }
        Update: {
          id?: string
          km_final?: number
          km_inicial?: number
          preco?: number
          tipo?: Database["public"]["Enums"]["faixa_tipo"]
        }
        Relationships: []
      }
      fornecedor_compras: {
        Row: {
          created_at: string
          data: string
          descricao: string | null
          fornecedor_id: string
          id: string
          valor: number
        }
        Insert: {
          created_at?: string
          data: string
          descricao?: string | null
          fornecedor_id: string
          id: string
          valor?: number
        }
        Update: {
          created_at?: string
          data?: string
          descricao?: string | null
          fornecedor_id?: string
          id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "fornecedor_compras_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
        ]
      }
      fornecedores: {
        Row: {
          cnpj: string | null
          contato_nome: string | null
          created_at: string
          endereco: string | null
          id: string
          nome_fantasia: string
          razao_social: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          cnpj?: string | null
          contato_nome?: string | null
          created_at?: string
          endereco?: string | null
          id: string
          nome_fantasia: string
          razao_social?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          cnpj?: string | null
          contato_nome?: string | null
          created_at?: string
          endereco?: string | null
          id?: string
          nome_fantasia?: string
          razao_social?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      horarios_funcionamento: {
        Row: {
          abertura: string
          ativo: boolean
          dia: string
          fechamento: string
          id: string
          ordem: number
        }
        Insert: {
          abertura?: string
          ativo?: boolean
          dia: string
          fechamento?: string
          id?: string
          ordem: number
        }
        Update: {
          abertura?: string
          ativo?: boolean
          dia?: string
          fechamento?: string
          id?: string
          ordem?: number
        }
        Relationships: []
      }
      kit_slots: {
        Row: {
          id: string
          kit_id: string
          nome: string
          ordem: number
          subcategoria_id: string
        }
        Insert: {
          id: string
          kit_id: string
          nome: string
          ordem?: number
          subcategoria_id: string
        }
        Update: {
          id?: string
          kit_id?: string
          nome?: string
          ordem?: number
          subcategoria_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kit_slots_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits_combos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kit_slots_subcategoria_id_fkey"
            columns: ["subcategoria_id"]
            isOneToOne: false
            referencedRelation: "subcategorias"
            referencedColumns: ["id"]
          },
        ]
      }
      kits_combos: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          imagem_url: string | null
          nome: string
          subcategoria_vinculo_id: string | null
          tipo: Database["public"]["Enums"]["kit_tipo"]
          tipo_desconto: Database["public"]["Enums"]["desconto_tipo"]
          updated_at: string
          valor_desconto: number
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id: string
          imagem_url?: string | null
          nome: string
          subcategoria_vinculo_id?: string | null
          tipo?: Database["public"]["Enums"]["kit_tipo"]
          tipo_desconto?: Database["public"]["Enums"]["desconto_tipo"]
          updated_at?: string
          valor_desconto?: number
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          imagem_url?: string | null
          nome?: string
          subcategoria_vinculo_id?: string | null
          tipo?: Database["public"]["Enums"]["kit_tipo"]
          tipo_desconto?: Database["public"]["Enums"]["desconto_tipo"]
          updated_at?: string
          valor_desconto?: number
        }
        Relationships: [
          {
            foreignKeyName: "kits_combos_subcategoria_vinculo_id_fkey"
            columns: ["subcategoria_vinculo_id"]
            isOneToOne: false
            referencedRelation: "subcategorias"
            referencedColumns: ["id"]
          },
        ]
      }
      pedido_itens: {
        Row: {
          combo_grupo_id: string | null
          id: string
          nome: string
          obs: string | null
          pedido_id: string
          preco: number
          produto_id: string | null
          qtd: number
          variante_id: string | null
          variante_nome: string | null
        }
        Insert: {
          combo_grupo_id?: string | null
          id?: string
          nome: string
          obs?: string | null
          pedido_id: string
          preco: number
          produto_id?: string | null
          qtd: number
          variante_id?: string | null
          variante_nome?: string | null
        }
        Update: {
          combo_grupo_id?: string | null
          id?: string
          nome?: string
          obs?: string | null
          pedido_id?: string
          preco?: number
          produto_id?: string | null
          qtd?: number
          variante_id?: string | null
          variante_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pedido_itens_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_itens_variante_id_fkey"
            columns: ["variante_id"]
            isOneToOne: false
            referencedRelation: "variantes"
            referencedColumns: ["id"]
          },
        ]
      }
      pedido_pagamentos: {
        Row: {
          id: string
          metodo: Database["public"]["Enums"]["pagamento_metodo"]
          pedido_id: string
          troco: number | null
          valor: number
        }
        Insert: {
          id?: string
          metodo: Database["public"]["Enums"]["pagamento_metodo"]
          pedido_id: string
          troco?: number | null
          valor: number
        }
        Update: {
          id?: string
          metodo?: Database["public"]["Enums"]["pagamento_metodo"]
          pedido_id?: string
          troco?: number | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedido_pagamentos_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos: {
        Row: {
          bairro: string | null
          canal: Database["public"]["Enums"]["pedido_canal"]
          cliente_id: string | null
          cliente_nome: string
          cliente_telefone: string | null
          codigo: string
          criado_em: string
          desconto: number
          endereco_texto: string | null
          forma_pagamento: string | null
          id: string
          lat: number | null
          lng: number | null
          observacoes: string | null
          pronto_em: string | null
          status: Database["public"]["Enums"]["pedido_status"]
          subtotal: number
          taxa_entrega: number
          tipo: Database["public"]["Enums"]["pedido_tipo"]
          total: number
          updated_at: string
        }
        Insert: {
          bairro?: string | null
          canal?: Database["public"]["Enums"]["pedido_canal"]
          cliente_id?: string | null
          cliente_nome: string
          cliente_telefone?: string | null
          codigo: string
          criado_em?: string
          desconto?: number
          endereco_texto?: string | null
          forma_pagamento?: string | null
          id: string
          lat?: number | null
          lng?: number | null
          observacoes?: string | null
          pronto_em?: string | null
          status?: Database["public"]["Enums"]["pedido_status"]
          subtotal?: number
          taxa_entrega?: number
          tipo?: Database["public"]["Enums"]["pedido_tipo"]
          total?: number
          updated_at?: string
        }
        Update: {
          bairro?: string | null
          canal?: Database["public"]["Enums"]["pedido_canal"]
          cliente_id?: string | null
          cliente_nome?: string
          cliente_telefone?: string | null
          codigo?: string
          criado_em?: string
          desconto?: number
          endereco_texto?: string | null
          forma_pagamento?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          observacoes?: string | null
          pronto_em?: string | null
          status?: Database["public"]["Enums"]["pedido_status"]
          subtotal?: number
          taxa_entrega?: number
          tipo?: Database["public"]["Enums"]["pedido_tipo"]
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      perfil_loja: {
        Row: {
          endereco: string | null
          id: number
          logo_url: string | null
          loja_aberta: boolean
          nome_loja: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          endereco?: string | null
          id?: number
          logo_url?: string | null
          loja_aberta?: boolean
          nome_loja?: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          endereco?: string | null
          id?: number
          logo_url?: string | null
          loja_aberta?: boolean
          nome_loja?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      produtos: {
        Row: {
          ativo: boolean
          categoria_id: string
          codigo_barras: string | null
          created_at: string
          descricao: string | null
          destaque: boolean
          foto_url: string | null
          id: string
          nome: string
          preco_base: number
          subcategoria_id: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          categoria_id: string
          codigo_barras?: string | null
          created_at?: string
          descricao?: string | null
          destaque?: boolean
          foto_url?: string | null
          id: string
          nome: string
          preco_base?: number
          subcategoria_id: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          categoria_id?: string
          codigo_barras?: string | null
          created_at?: string
          descricao?: string | null
          destaque?: boolean
          foto_url?: string | null
          id?: string
          nome?: string
          preco_base?: number
          subcategoria_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produtos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtos_subcategoria_id_fkey"
            columns: ["subcategoria_id"]
            isOneToOne: false
            referencedRelation: "subcategorias"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          nome: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          nome?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      promocao_produtos: {
        Row: {
          id: string
          preco_final: number
          preco_original: number
          produto_nome: string
          promocao_id: string
          variante_nome: string | null
        }
        Insert: {
          id?: string
          preco_final: number
          preco_original: number
          produto_nome: string
          promocao_id: string
          variante_nome?: string | null
        }
        Update: {
          id?: string
          preco_final?: number
          preco_original?: number
          produto_nome?: string
          promocao_id?: string
          variante_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promocao_produtos_promocao_id_fkey"
            columns: ["promocao_id"]
            isOneToOne: false
            referencedRelation: "promocoes_banner"
            referencedColumns: ["id"]
          },
        ]
      }
      promocoes_banner: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          id: string
          imagem_url: string | null
          nome: string
          ordem: number
          tipo_desconto: Database["public"]["Enums"]["promo_desconto_tipo"]
          valor_desconto: number
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id: string
          imagem_url?: string | null
          nome: string
          ordem?: number
          tipo_desconto?: Database["public"]["Enums"]["promo_desconto_tipo"]
          valor_desconto?: number
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          imagem_url?: string | null
          nome?: string
          ordem?: number
          tipo_desconto?: Database["public"]["Enums"]["promo_desconto_tipo"]
          valor_desconto?: number
        }
        Relationships: []
      }
      rota_parada_itens: {
        Row: {
          id: string
          nome: string
          parada_id: string
          preco: number
          qtd: number
        }
        Insert: {
          id?: string
          nome: string
          parada_id: string
          preco: number
          qtd: number
        }
        Update: {
          id?: string
          nome?: string
          parada_id?: string
          preco?: number
          qtd?: number
        }
        Relationships: [
          {
            foreignKeyName: "rota_parada_itens_parada_id_fkey"
            columns: ["parada_id"]
            isOneToOne: false
            referencedRelation: "rota_paradas"
            referencedColumns: ["id"]
          },
        ]
      }
      rota_paradas: {
        Row: {
          bairro: string | null
          baixa_realizada: boolean
          cliente: string
          criado_em: string
          desconto: number | null
          endereco: string | null
          forma_pagamento: string | null
          id: string
          km: number | null
          lat: number | null
          lng: number | null
          observacoes: string | null
          ordem: number
          origem: string | null
          parada_status: Database["public"]["Enums"]["parada_status"]
          pedido_codigo: string
          pedido_id: string | null
          rota_id: string
          taxa_entrega: number | null
          telefone: string | null
          total_pedido: number | null
        }
        Insert: {
          bairro?: string | null
          baixa_realizada?: boolean
          cliente: string
          criado_em?: string
          desconto?: number | null
          endereco?: string | null
          forma_pagamento?: string | null
          id: string
          km?: number | null
          lat?: number | null
          lng?: number | null
          observacoes?: string | null
          ordem?: number
          origem?: string | null
          parada_status?: Database["public"]["Enums"]["parada_status"]
          pedido_codigo: string
          pedido_id?: string | null
          rota_id: string
          taxa_entrega?: number | null
          telefone?: string | null
          total_pedido?: number | null
        }
        Update: {
          bairro?: string | null
          baixa_realizada?: boolean
          cliente?: string
          criado_em?: string
          desconto?: number | null
          endereco?: string | null
          forma_pagamento?: string | null
          id?: string
          km?: number | null
          lat?: number | null
          lng?: number | null
          observacoes?: string | null
          ordem?: number
          origem?: string | null
          parada_status?: Database["public"]["Enums"]["parada_status"]
          pedido_codigo?: string
          pedido_id?: string | null
          rota_id?: string
          taxa_entrega?: number | null
          telefone?: string | null
          total_pedido?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rota_paradas_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rota_paradas_rota_id_fkey"
            columns: ["rota_id"]
            isOneToOne: false
            referencedRelation: "rotas"
            referencedColumns: ["id"]
          },
        ]
      }
      rotas: {
        Row: {
          acao_anterior: string | null
          bonificacao: number | null
          created_at: string
          entregador_id: string | null
          entregador_lat: number | null
          entregador_lng: number | null
          entregador_nome: string
          entregador_veiculo: string | null
          fim_rota: string | null
          id: string
          inicio_rota: string | null
          km_total: number | null
          proxima_acao: string | null
          status: Database["public"]["Enums"]["rota_status"]
          tempo_estimado: number | null
        }
        Insert: {
          acao_anterior?: string | null
          bonificacao?: number | null
          created_at?: string
          entregador_id?: string | null
          entregador_lat?: number | null
          entregador_lng?: number | null
          entregador_nome: string
          entregador_veiculo?: string | null
          fim_rota?: string | null
          id: string
          inicio_rota?: string | null
          km_total?: number | null
          proxima_acao?: string | null
          status?: Database["public"]["Enums"]["rota_status"]
          tempo_estimado?: number | null
        }
        Update: {
          acao_anterior?: string | null
          bonificacao?: number | null
          created_at?: string
          entregador_id?: string | null
          entregador_lat?: number | null
          entregador_lng?: number | null
          entregador_nome?: string
          entregador_veiculo?: string | null
          fim_rota?: string | null
          id?: string
          inicio_rota?: string | null
          km_total?: number | null
          proxima_acao?: string | null
          status?: Database["public"]["Enums"]["rota_status"]
          tempo_estimado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rotas_entregador_id_fkey"
            columns: ["entregador_id"]
            isOneToOne: false
            referencedRelation: "entregadores"
            referencedColumns: ["id"]
          },
        ]
      }
      subcategorias: {
        Row: {
          ativo: boolean
          categoria_id: string
          created_at: string
          descricao: string | null
          id: string
          imagem_url: string | null
          nome: string
          ordem: number
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          categoria_id: string
          created_at?: string
          descricao?: string | null
          id: string
          imagem_url?: string | null
          nome: string
          ordem?: number
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          categoria_id?: string
          created_at?: string
          descricao?: string | null
          id?: string
          imagem_url?: string | null
          nome?: string
          ordem?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategorias_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      transacoes: {
        Row: {
          data_hora: string
          descricao: string
          id: string
          metodo: Database["public"]["Enums"]["transacao_metodo"]
          origem: Database["public"]["Enums"]["transacao_origem"]
          tipo: Database["public"]["Enums"]["transacao_tipo"]
          valor: number
        }
        Insert: {
          data_hora?: string
          descricao: string
          id: string
          metodo: Database["public"]["Enums"]["transacao_metodo"]
          origem: Database["public"]["Enums"]["transacao_origem"]
          tipo: Database["public"]["Enums"]["transacao_tipo"]
          valor: number
        }
        Update: {
          data_hora?: string
          descricao?: string
          id?: string
          metodo?: Database["public"]["Enums"]["transacao_metodo"]
          origem?: Database["public"]["Enums"]["transacao_origem"]
          tipo?: Database["public"]["Enums"]["transacao_tipo"]
          valor?: number
        }
        Relationships: []
      }
      turno_extras: {
        Row: {
          descricao: string
          id: string
          turno_id: string
          valor: number
        }
        Insert: {
          descricao: string
          id?: string
          turno_id: string
          valor: number
        }
        Update: {
          descricao?: string
          id?: string
          turno_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "turno_extras_turno_id_fkey"
            columns: ["turno_id"]
            isOneToOne: false
            referencedRelation: "entregador_turnos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      variantes: {
        Row: {
          created_at: string
          custo: number
          descricao: string | null
          ean: string | null
          estoque_atual: number
          estoque_minimo: number
          foto_url: string | null
          id: string
          nome: string
          produto_id: string
          tags: string[]
          unidade: Database["public"]["Enums"]["unidade_medida"]
          updated_at: string
          valor_venda: number
        }
        Insert: {
          created_at?: string
          custo?: number
          descricao?: string | null
          ean?: string | null
          estoque_atual?: number
          estoque_minimo?: number
          foto_url?: string | null
          id: string
          nome: string
          produto_id: string
          tags?: string[]
          unidade?: Database["public"]["Enums"]["unidade_medida"]
          updated_at?: string
          valor_venda?: number
        }
        Update: {
          created_at?: string
          custo?: number
          descricao?: string | null
          ean?: string | null
          estoque_atual?: number
          estoque_minimo?: number
          foto_url?: string | null
          id?: string
          nome?: string
          produto_id?: string
          tags?: string[]
          unidade?: Database["public"]["Enums"]["unidade_medida"]
          updated_at?: string
          valor_venda?: number
        }
        Relationships: [
          {
            foreignKeyName: "variantes_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "operador"
      cupom_tipo: "percentual" | "fixo"
      desconto_tipo: "%" | "R$"
      faixa_tipo: "cliente" | "entregador"
      kit_tipo: "kit" | "combo"
      movimento_tipo: "entrada" | "saida" | "perda" | "correcao"
      pagamento_metodo:
        | "dinheiro"
        | "pix"
        | "cartao_credito"
        | "cartao_debito"
        | "qr"
      parada_status: "pendente" | "entregue"
      pedido_canal:
        | "balcao"
        | "whatsapp"
        | "99food"
        | "ifood"
        | "app"
        | "telefone"
      pedido_status:
        | "rascunho"
        | "pendente"
        | "pronto"
        | "em_rota"
        | "entregue"
        | "cancelado"
      pedido_tipo: "entrega" | "retirada"
      promo_desconto_tipo: "percentual" | "fixo" | "nenhum"
      rota_status: "pendente" | "em_rota" | "finalizada" | "concluida"
      transacao_metodo: "dinheiro" | "pix" | "cartao" | "qrcode"
      transacao_origem: "venda" | "acerto" | "sangria" | "reforco" | "manual"
      transacao_tipo: "entrada" | "saida"
      unidade_medida: "un" | "kg" | "L" | "ml" | "g" | "pct"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "operador"],
      cupom_tipo: ["percentual", "fixo"],
      desconto_tipo: ["%", "R$"],
      faixa_tipo: ["cliente", "entregador"],
      kit_tipo: ["kit", "combo"],
      movimento_tipo: ["entrada", "saida", "perda", "correcao"],
      pagamento_metodo: [
        "dinheiro",
        "pix",
        "cartao_credito",
        "cartao_debito",
        "qr",
      ],
      parada_status: ["pendente", "entregue"],
      pedido_canal: [
        "balcao",
        "whatsapp",
        "99food",
        "ifood",
        "app",
        "telefone",
      ],
      pedido_status: [
        "rascunho",
        "pendente",
        "pronto",
        "em_rota",
        "entregue",
        "cancelado",
      ],
      pedido_tipo: ["entrega", "retirada"],
      promo_desconto_tipo: ["percentual", "fixo", "nenhum"],
      rota_status: ["pendente", "em_rota", "finalizada", "concluida"],
      transacao_metodo: ["dinheiro", "pix", "cartao", "qrcode"],
      transacao_origem: ["venda", "acerto", "sangria", "reforco", "manual"],
      transacao_tipo: ["entrada", "saida"],
      unidade_medida: ["un", "kg", "L", "ml", "g", "pct"],
    },
  },
} as const
