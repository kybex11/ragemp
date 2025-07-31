mp.events.add('render', () => {
    const iplList = [
        // Город и жилые районы
        "apa_v_mp_h_01_a", "apa_v_mp_h_01_b", "apa_v_mp_h_01_c", "apa_v_mp_h_01_d", "apa_v_mp_h_01_e",
        "hei_bi_hw1_13_door", "hei_dt1_03_carpark", "dt1_05_hc_remove",
        "v_rockclub", "hei_hw1_blimp_interior_v_blimp",
        
        // Пустыня, Blaine County
        "cs1_02_cf_onmission1", "cs1_02_cf_onmission2", "cs1_02_cf_onmission3",
        "cs1_02_cf_onmission4", "cs1_02_cf_onmission5", "cs1_02_cf_onmission6",
        
        // Вайнвуд и деловой центр
        "shutter_open", "shutter_closed", "ferris_finale_Anim",
        "rc12b_destroyed", "rc12b_default", "rc12b_fixed",

        // Интерьеры
        "v_carshowroom", "v_carshowroom.plan", "shr_int",
        "v_strip3", "v_strip3_lights", "v_58_sol_office",
        "v_club_office", "v_trevlig", "v_trailer", "v_trailer6",

        // Мосты, дороги, инфраструктура
        "bh1_47_joshhse_unburnt", "bh1_47_joshhse_firevfx", "bh1_47_joshhse_base",
        "sc1_01_newbill", "sc1_01_newbillboard",
        "dt1_05_hc_delete", "dt1_05_hc_remove",

        // Полиция, пожарка, больницы
        "v_police", "v_police2", "v_metro", "v_hospital",
        
        // Аэропорт, доки
        "airfield", "v_dockcontrol", "v_dock_crates", "v_dockoffice",
        
        // Казино, обновления, ограбления
        "vw_casino_main", "vw_casino_penthouse", "vw_casino_carpark",
        "vw_casino_garage", "hei_dlc_casino_aircon",
        "hei_dlc_casino_door",
        
        // Cayo Perico (на всякий случай, если НЕ нужен остров)
        "h4_islandairstrip", "h4_islandx_mansion", "h4_islandx_props", "h4_islandxdock",
        "h4_islandxdock_props", "h4_islandx_sea_mines",

        // Лодки, яхты, корабли
        "hei_yacht_heist", "hei_yacht_heist_bar", "hei_yacht_heist_bedrm",
        "hei_yacht_heist_bridge", "hei_yacht_heist_enginrm", "hei_yacht_heist_lounge",

        // Прочее
        "ex_exec_warehouse_placement_interior_1_int_warehouse_s_dlc_milo",
        "ex_exec_warehouse_placement_interior_0_int_warehouse_m_dlc_milo",
        "ex_exec_warehouse_placement_interior_2_int_warehouse_l_dlc_milo"
    ];

    for (const ipl of iplList) {
        mp.game.streaming.removeIpl(ipl);
    }
});
