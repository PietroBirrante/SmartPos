var MenuLeft = '                                <div id="sidebar" class="sidebar"> '+
                                                '<div data-scrollbar="true" data-height="100%"> ' +
                                                    '<ul class="nav"> ' +
                                                        '<li class="nav-profile"> ' +
                                                            '<div class="image"> ' +
                                                                '<a href="javascript:;"><img src="' + Storages.getSession('_Img') + '" id="img-left" alt="" /></a> ' +
                                                            '</div> ' +
                                                            '<div class="info" id="info"> ' +
                                                                '<small id="user" class="info">' + Storages.getSession('_Users') + '</small><small id="mail" style="font-size: x-small; color: fff;">' + Storages.getSession('_Utente') + '</small> ' +
                                                            '</div> ' +
                                                        '</li> ' +
                                                    '</ul> ' +
                                                    Storages.getSession('_Menus') +
                                                '</div> ' +
                                                '</div> ' +
                                                '<div class="sidebar-bg"></div> ';                              