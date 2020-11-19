<div id="page-content">
    <h3 id="title">Classement des meilleurs joueurs</h3>
    <div class="navigation-group">
        <a href="best-player.php?queue=Solo" id="solo-btn" class="navigation-btn selected">Solo/Duo</a>
        <a href="best-player.php?queue=Flex" id="flex-btn" class="navigation-btn">Flex</a>
    </div>
    <hr style="width: calc(100px + 40vw) fit-content; background-color: #121212;">
    <div class="ranking-podium">
        <ul class="ranking-podium-list">
        </ul>
    </div>
    <div class="scrollable">
        <table class="ranking-table">
            <colgroup>
                <col width="10%">
                <col width="30%">
                <col width="15%">
                <col width="15%">
                <col width="30%">
            </colgroup>
            <thead>
                <tr>
                    <th></th>
                    <th>Invocateurs</th>
                    <th>Tier</th>
                    <th>LP</th>
                    <th>Win Ratio</th>
                </tr>
            </thead>
            <tbody id="table-body">
            </tbody>
        </table>
    </div>
</div>