select d.*, m.clipguid, m.vtrinpoint
     from dcma_essencemark d, dcma_materialmetadata m
    where d.entityid = m.entityid
      and d.entityid in
          (select t.entityid
             from dcm_entityclip t, dcm_entityandclass ec, dcm_class c
            where t.entityid = ec.entityid
              and ec.nodeid = c.nodeid
              and c.NodeID in
                  (7530, 7631, 7683, 7686, 7800, 7531, 7684, 7685))
      and d.markguid in
          (select e.markguid
             from dcma_markextendinfo e, dcma_markextendinfo_data f
            where e.itemid = f.itemid
              and (e.itemtype = 1 and (f.languageid = 1 or f.languageid = 0) and
                  upper(f.itemvalue) like '%PALMEIRO%' escape '.'))







select d.*, m.clipguid, m.vtrinpoint
  from dcma_essencemark d, dcma_materialmetadata m
 where d.entityid = m.entityid
   and d.entityid in
       (select t.entityid
          from dcm_entityclip t, dcm_entityandclass ec, dcm_class c
         where t.entityid = ec.entityid
           and ec.nodeid = c.nodeid
           and c.NodeID in (7697, 7920, 8986, 7921, 9790, 9509, 7940, 8218, 9147, 7849, 7865, 8984, 9510, 8285, 9181, 7850, 9822, 9323, 7847, 8985, 7866, 9507, 8217, 9145, 9820, 7848, 7698, 8983, 8284, 9508, 7751, 9966, 7699, 9146,
                10201))
   and upper(d.note) like '%HALLADAY%' escape '.'

